import React,{ Component, Fragment } from "react";
import logo from './logo.png';
import './style.css';
import { Menu } from 'antd';
import axios from 'axios';
import { TeamOutlined, IdcardOutlined, WechatOutlined,
DingdingOutlined, GoogleOutlined, DribbbleOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state= {
      list:[]
    }
  }

  getItemList () {
    if(!this.state.list.length){
      return;
    }
    return this.state.list.map((el) => {
      return (
        <Menu.Item key={el.id} icon={el.icon}>
          <Link to={`/${el.id}`}>
            {el.title}
          </Link>
        </Menu.Item>
      )
    })
  }

  getItemData() {
    axios.get('http://www.dell-lee.com/react/api/header.json')
      .then(this.getDataSucc.bind(this));
  }

  getDataSucc(res) {
    res = res.data.data;
    res[0].icon = <TeamOutlined />;
    res[1].icon = <IdcardOutlined />;
    res[2].icon = <DingdingOutlined />;
    res[3].icon = <GoogleOutlined />;
    res[4].icon = <WechatOutlined />;
    res[5].icon = <DribbbleOutlined />;
    this.setState({
      list: res
    });
  }

  render() {
    return (
      <Fragment>
        <Link to="/">
          <img src={ logo } alt="顶部图片" className="header-logo" />
        </Link>
        <Menu mode="horizontal" className="header-menu">
          {this.getItemList()}
        </Menu>
      </Fragment>
    );
  }

  componentDidMount() {
    this.getItemData();
  }
}

export default AppHeader;
