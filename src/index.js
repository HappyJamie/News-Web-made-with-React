import React,{ Component, Fragment } from "react";
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import AppHeader from './components/Header/index.js'
import Login from './components/Login/';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import List from './containers/List/';
import Detail from './containers/Detail/';
import Vip from './containers/Vip/';

const { Header, Footer,  Content } = Layout;

class App extends Component {
  render() {
    // JSX外层得注释不需要用花括号
    return (
      <Fragment>
        {/* 这是JSX中的注释 */}
        <BrowserRouter>
          <Layout style={{minWidth:1300, height:'100%'}}>
            <Header className="header">
              <AppHeader />
            </Header>
            <Content className="content">
              <Login />
              <Switch>
                <Route path="/vip" component={Vip} />
                <Route path="/detail/:id" component={Detail} />
                <Route path="/:id?" component={List} />
                {/* 添加？表示可传可不传，使根路径“/”依然可以匹配上 */}
              </Switch>
            </Content>
            <Footer className="footer">@Copyright Jamie-Fung 2020</Footer>
          </Layout>
        </BrowserRouter>
      </Fragment>
    );
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
