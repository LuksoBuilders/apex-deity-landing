import type { NextPage } from "next";
import PageLayout from "../components/layouts/PageLayout";
import { HolyShitInfo, FarmingSection } from "../components/organisms";

const HolyShitPage: NextPage = () => {
    return (
        <PageLayout>
            <HolyShitInfo />
            <div style={{ marginTop: "2em" }}></div>
            <FarmingSection />
        </PageLayout>
    );
};

export default HolyShitPage;
