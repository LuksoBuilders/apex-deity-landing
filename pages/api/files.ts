import formidable from "formidable";
import fs from "fs";
import lighthouse from "@lighthouse-web3/sdk";

const lighthouseStorageKey = "3f76e61d.78a681ae71b940dc8660fae9f188c837";

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveFile = async (file) => {
  try {
    const stream = fs.createReadStream(file.filepath);

    const response = await lighthouse.uploadBuffer(
      stream,
      lighthouseStorageKey
    );
    fs.unlinkSync(file.filepath);

    return response;
  } catch (error) {
    console.error("File upload error in lighthouse storage", error);
    throw error;
  }
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("are we even here???");
      const form = new formidable.IncomingForm();
      form.parse(req, async function (err, fields, files) {
        if (err) {
          console.log({ err });
          return res.status(500).send("Upload Error");
        }
        const response = await saveFile(files.file);
        const { data } = response;

        return res.send(data.Hash);
      });
    } catch (e) {
      console.log(e);
      res.status(500).send("Server Error");
    }
  } else if (req.method === "GET") {
  }
}
