import { QueryClientProvider } from "react-query";
import { ReactQueryClient } from "./libs";
import { CustomerListView } from "./components";
import { Layout, Typography } from "antd";

const { Content } = Layout;

const App = () => {
  return (
    <QueryClientProvider client={ReactQueryClient}>
      <Layout>
        <Typography.Title level={2}>
          Parloa's Customers Overview
        </Typography.Title>

        <Content style={{ padding: "0 16px" }}>
          <CustomerListView />
        </Content>
      </Layout>
    </QueryClientProvider>
  );
};

export default App;
