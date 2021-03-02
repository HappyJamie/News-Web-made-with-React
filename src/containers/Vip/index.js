import Axios from 'axios';
import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import './style.css'

class Vip extends Component{
    constructor (props) {
        super(props);
        this.state = {
            login: true,
            fetchFinsh: false
        }
    }

    render () {
        const { login, fetchFinsh } = this.state;
        if(login){
            if(fetchFinsh){
                return(
                    <Fragment>
                        <div className="vip">
                            VIP
                        </div>
                    </Fragment>
                )
            } else {
                // 没获取登陆状态之前展示的内容
                return(
                    <div className="vip">
                        Loading……
                    </div>
                )
            }
        } else {
            return(  
                <Redirect to="/" />
            )
        }
        
    }

    componentDidMount () {
        Axios.get('http://www.dell-lee.com/react/api/isLogin.json', {
        withCredentials: true
        })
          .then((res) => {
              const login = res.data.data.login;
              this.setState({
                  login,
                  fetchFinsh: true
                })
          })
    }
}

export default Vip;
