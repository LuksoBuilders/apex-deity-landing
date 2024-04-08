import type { NextPage } from "next";
import PageLayout from "../components/layouts/PageLayout";
import { Hero, LearningCurve, CompareTable, Minting } from "../components/organisms";

const Home: NextPage = () => {
    return (
        <PageLayout>
            <Hero />
            <Minting />
            <div style={{ marginTop: "4em" }}></div>
            <CompareTable />
            <div style={{ marginTop: "4em" }}></div>
            <LearningCurve />
        </PageLayout>
    );
};

export default Home;
