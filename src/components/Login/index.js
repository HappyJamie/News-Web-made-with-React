import React,{ Component, Fragment } from "react";
import { Modal, Button, Input, Space, message } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import './style.css';
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      login: false,
      modal: false,
      user: '',
      password: ''
    }
    // 给事件绑定this的作用域
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.changeInvUser = this.changeInvUser.bind(this);
    this.changeInvPwd = this.changeInvPwd.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.logOut = this.logOut.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
  }
  // 登录框的显示和隐藏
  showModal () {
      this.setState({
          modal:true
      })
  }

  hideModal () {
    this.setState({
        modal:false
    })
  }
  // 账号密码输入框数据绑定的事件
  changeInvUser (e) {
    let user = e.target.value;
    this.setState({user});
  }
  changeInvPwd (e) {
    let password = e.target.value;
    this.setState({password});
  }
  // 设置发送ajax请求的登录函数
  // 默认账号密码皆为admin
  checkLogin () {
    const { user, password } = this.state;
    let url = `http://www.dell-lee.com/react/api/login.json?user=${user}&password=${password}`;
    Axios.get(url, {
      withCredentials: true
    }).then( (res) => {
      const login = res.data.data.login;
      // 登录成败的对应操作、提示
      if (login){
        message.success('登录成功');
        this.setState({
          login,
          modal: false
        });
      } else {
        message.error('登录失败');
      }
    })
  }

  // 设置登出函数
  logOut () {
    const key = 'updatable';
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.success({ content: '退出成功!', key, duration: 2 });
      Axios.get('http://www.dell-lee.com/react/api/logout.json', {
        withCredentials: true
      })
        .then((res) => {
            const login = !res.data.data.logout;
            if(!login){
              this.setState({login});
            }
            // 返回主页面
            this.props.history.push('/');
        })
    }, 1000);
  }

  // 在通向VIP界面时检测登录状态发送提示
  checkStatus () {
    let { login } = this.state
    if( !login ){
      message.info('请先登录',1.5);
    }
  }

  render() {
    let { login , modal } = this.state;
    return (
      <Fragment>
          <div className="login" key="login">
            {
                login?
                <Button type="primary"
                  onClick={this.logOut}
                >
                  退出
                </Button>:
                <Button type="primary"
                  onClick={this.showModal}>
                  登录
                </Button>
            }
            <Link to="/vip">
              <Button type="primary" 
                style={{marginLeft:'10px'}}
                onClick={this.checkStatus}
              >
                Vip
              </Button>
            </Link>
            {/* 登录弹窗 */}
            <Modal
              title="登录"
              visible={modal}
              onOk={() => {}}
              onCancel={this.hideModal}
              width={300}
              footer={[
                <div style={{textAlign:'center'}} key="loginButton">
                <Button key="back" onClick={this.hideModal}>
                  取消
                </Button>,
                <Button key="submit" type="primary" onClick={this.checkLogin}>
                  登录
                </Button></div>,
              ]}
            >
              <Space direction="vertical">
                <Input placeholder="请输入用户名" prefix={<UserOutlined />}
                  value={this.state.user} 
                  onChange={this.changeInvUser} 
                  key="user"
                />
                <Input.Password
                  placeholder="请输入密码"
                  prefix={<LockOutlined />}
                  value={this.state.password}
                  key="password"
                  onChange={this.changeInvPwd}
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Space>
            </Modal>
          </div>
      </Fragment>
    );
  }
  
  // Ajax请求核对登录状态
  componentDidMount () {
      Axios.get('http://www.dell-lee.com/react/api/isLogin.json', {
        withCredentials: true
      })
        .then((res) => {
            const login = res.data.data.login;
            this.setState({login})
        })
  }

}

export default withRouter( Login );
