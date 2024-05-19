import imageCompression from "browser-image-compression";
import { keccak256 } from "ethers/lib/utils";
import { AddResult } from "ipfs-core-types/src/root";
import { ImportCandidate } from "ipfs-core-types/src/utils";
import { create, IPFSHTTPClient } from "ipfs-http-client";

import { ImageBuffer, ImageMetadata } from "../interfaces";
import { AssetBuffer, AssetMetadata } from "../interfaces/metadata";
import {
  IPFSGateway,
  UploadOptions,
} from "../interfaces/profile-upload-options";

function uint8ArrayToBlob(uint8Array: Uint8Array) {
  return new Blob([uint8Array]);
}

function jsonStringToBlob(jsonString) {
  const uint8Array = new TextEncoder().encode(jsonString);
  return new Blob([uint8Array], { type: "application/json" });
}

export const defaultSizes = [1800, 1024, 640, 320, 180];
export async function imageUpload(
  givenFile: File | ImageBuffer,
  uploadOptions: UploadOptions,
  sizes?: number[]
): Promise<ImageMetadata[]> {
  const type = "type" in givenFile ? givenFile.type : givenFile.mimeType;
  const isImage = type?.substr(0, 6) === "image/";
  if (!isImage) {
    throw new Error(`File type: '${type}' does not start with 'image/'`);
  }

  sizes = sizes ?? defaultSizes;

  return Promise.all(
    sizes.map(async (size) => {
      let imgToUpload, imgBuffer, width: number, height: number;

      if ("buffer" in givenFile) {
        throw new Error("Buffer image upload is depricated");
        // imgBuffer = await resizeBuffer(givenFile.buffer, givenFile.mimeType, size);
        // imgToUpload = imgBuffer;

        // const resizedDimensions = imageSize(imgBuffer);
        // height = resizedDimensions.height;
        // width = resizedDimensions.width;
      } else {
        imgToUpload = await imageCompression(givenFile, {
          maxWidthOrHeight: size,
          useWebWorker: true,
        });

        imgBuffer = new Uint8Array(await imgToUpload.arrayBuffer());
        const loadedImg = await imageCompression.drawFileInCanvas(imgToUpload);

        height = loadedImg[0].height;
        width = loadedImg[0].width;
      }

      let uploadResponse;
      if (uploadOptions.url) {
        // TODO: add simple HTTP upload
      } else {
        uploadResponse = await ipfsUpload(imgToUpload);
      }

      console.log("upload response is: ", uploadResponse);

      return {
        width,
        height,
        verificationFunction: "keccak256(bytes)",
        verificationData: keccak256(imgBuffer),
        url: "ipfs://" + uploadResponse,
      };
    })
  );
}

export async function assetUpload(
  asset: File | AssetBuffer,
  uploadOptions: UploadOptions
): Promise<AssetMetadata> {
  let fileBuffer;
  let fileType: string;

  if ("buffer" in asset) {
    fileBuffer = asset.buffer;
    fileType = asset.mimeType;
  } else {
    fileBuffer = new Uint8Array(await asset.arrayBuffer());
    fileType = asset.type;
  }

  let ipfsResult;
  if (uploadOptions.url) {
    // TODO: Simple HTTP upload
  } else {
    ipfsResult = await ipfsUpload(fileBuffer);
  }

  return {
    verificationFunction: "keccak256(bytes)",
    verificationData: keccak256(fileBuffer),
    url: "ipfs://" + ipfsResult,
    fileType,
  };
}

export async function ipfsUpload(file: File): Promise<string> {
  let ipfs: IPFSHTTPClient;

  //const formData = new FormData();
  //formData.append("file", file, file.name);

  if (file instanceof Uint8Array) {
    try {
      const formData = new FormData();
      formData.append("file", uint8ArrayToBlob(file), file.name);

      const res = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      const ipfsHash = await res.text();

      return ipfsHash;
    } catch (err) {
      console.error(err);
    }
  } else {
    if (typeof file === "string") {
      try {
        const formData = new FormData();
        formData.append("file", jsonStringToBlob(file), "placeholder");

        const res = await fetch("/api/files", {
          method: "POST",
          body: formData,
        });

        const ipfsHash = await res.text();

        return ipfsHash;
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("file", file, file.name);

        const res = await fetch("/api/files", {
          method: "POST",
          body: formData,
        });

        const ipfsHash = await res.text();

        return ipfsHash;
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export async function prepareMetadataImage(
  uploadOptions?: UploadOptions,
  image?: File | ImageBuffer | ImageMetadata[],
  sizes?: number[]
): Promise<ImageMetadata[]> | null {
  let metadataImage: ImageMetadata[] | null;

  if (Array.isArray(image)) {
    metadataImage = image ?? null;
  } else if (image) {
    metadataImage = await imageUpload(image, uploadOptions, sizes);
  }

  return metadataImage;
}

export async function prepareMetadataAsset(
  asset: File | AssetBuffer | AssetMetadata,
  uploadOptions?: UploadOptions
): Promise<AssetMetadata> {
  let assetMetadata: AssetMetadata | null;

  if ("verificationFunction" in asset) {
    assetMetadata = asset ?? null;
  } else if (asset) {
    assetMetadata = await assetUpload(asset, uploadOptions);
  }

  return assetMetadata;
}

// export async function resizeBuffer(buffer: Buffer, format: string, size: number): Promise<Buffer> {
//   const image = await Jimp.read(buffer);
//   return image.scaleToFit(size, size).getBufferAsync(format);
// }

export function isMetadataEncoded(metdata: string): boolean {
  if (
    metdata.startsWith("0x") &&
    !metdata.startsWith("ipfs://") &&
    !metdata.startsWith("https://")
  ) {
    return true;
  }

  return false;
}

export function formatIPFSUrl(ipfsGateway: IPFSGateway, ipfsHash: string) {
  let ipfsUrl: string;

  if (typeof ipfsGateway === "string") {
    ipfsUrl = ipfsGateway.endsWith("/")
      ? `${ipfsGateway}${ipfsHash}`
      : `${ipfsGateway}/${ipfsHash}`;
  } else {
    const protocol = ipfsGateway?.host ?? "https";
    const host = ipfsGateway?.host ?? "2eff.lukso.dev";

    ipfsUrl = `${[protocol]}://${host}/ipfs/${ipfsHash}`;
  }

  return ipfsUrl;
}