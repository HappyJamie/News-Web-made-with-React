import React,{ Component, Fragment } from "react";
import { List } from 'antd';
import axios from 'axios';
import { Link } from "react-router-dom";

class PageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id:''
    }
  }

  getListData (id) {
    let url = 'http://www.dell-lee.com/react/api/list.json';
    if(id){
      url = url + '?id=' + id;
    }
    axios.get(url)
      .then( (res) => {
        res = res.data;
        if(res.data.length && res.success){
          res = res.data;
          this.setState({
            data:res,
            id
          })
        }
      })
  }

  componentWillReceiveProps(nextProps) {
    let id = nextProps.match.params.id;
    if(id === this.state.id)return;
    this.getListData(id);
  }

  render() {
    return (
      <Fragment>
        <List
          style={{background:'#fff'}}
          bordered
          dataSource={this.state.data}
          renderItem={item => (
            <List.Item key={item.id}>
              <Link to={`/detail/${item.id}`}>{item.title}</Link>
            </List.Item>
          )}
        />
      </Fragment>
    );
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.getListData(id);
  }

}

export default PageList;
