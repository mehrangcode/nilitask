import { ConfigProvider, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import faIR from "antd/lib/locale/fa_IR";
import { BrowserRouter } from 'react-router-dom';
import Container from './Container';
import './app.css';
function App() {
  return (
    <BrowserRouter>
      <ConfigProvider
        locale={faIR}
        direction='rtl'
        theme={{
          cssVar: true,
          // algorithm: theme.darkAlgorithm,
          token: {
            fontFamily: "iranYekan",
            colorPrimary: '#6420AA',
          },
        }}
      >
        <Layout>
          <Content>
            <Container />
          </Content>
        </Layout>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
