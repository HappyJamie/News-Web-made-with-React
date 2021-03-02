import React,{ Component, Fragment } from "react";
import { Card } from 'antd';
import Axios from "axios";
import './style.css';

class Detail extends Component {
  constructor (props){
    super(props);
    this.state= {
      title: '',
      content: ''
    }
  }

  getDetailData (id) {
    if(!id){
      id = 1;
    }
    Axios.get('http://www.dell-lee.com/react/api/detail.json?id=' + id)
      .then( (res) => {
        res = res.data;
        if(res.success && res.data){
          res = res.data;
          this.setState(res)
        }
      } )
  }

  render() {
    return (
      <Fragment>
        <Card title={this.state.title} >
          <div className="detail" dangerouslySetInnerHTML={{__html:this.state.content}} />
        </Card>
      </Fragment>
    );
  }

  componentDidMount () {
    let id = this.props.match.params.id;
    this.getDetailData(id);
  }

}

export default Detail;
