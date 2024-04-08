import { Container } from "react-grid-system";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Header, Links } from "../organisms";

interface PageLayoutProps {
    children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Container>
                <Header />
                <div style={{ marginTop: "2em" }}>
                    {children}
                </div>
                <Links />
                <div style={{ marginTop: "4em" }}></div>
            </Container>
        </motion.div>
    );
};

export default PageLayout;
