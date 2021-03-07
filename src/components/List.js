import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const PageContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const ListContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  max-width: 500px;
  display: flex;
  flex-flow: column nowrap;
  padding: 16px;
  `;
  
  const ListItem = styled.div`
  margin-top: 16px;
  background-color: ${props => props.isGoodFood ? '#a3de83' : '#fa4659'};
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
`;

const ListItemHeader = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 1rem;
  font-weight: bold;
`;

const ListItemBody = styled.div`
  padding: 1rem;
`;

const ListItemHeaderIcon = styled(FontAwesomeIcon)`
  transform: ${props => props.isOpenTab ? 'rotate(90deg)' : 'none'};
  transition: transform 0.3s ease-out;
`;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: [],
      openedTabs: [],
      isFetching: true
    };
  }

  componentDidMount() {
    const fetchFoodItem = item => new Promise((res, rej) => {
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => {
          json.title = item;
          json['isGoodFood'] = Math.random() > 0.5;
          res(json);
        })
        .catch(err => {
          rej(err);
        });
    });

    const fetchRequests = [];
    for (let item of this.props.itemList) {
      fetchRequests.push(fetchFoodItem(item));
    };

    //window.setTimeout(() => {
      Promise.all(fetchRequests)
      .then(foodItems => {
        const openTabs = [];
        for (let i = 0; i < foodItems.length; i++) {
          openTabs.push(false);
        }
        this.setState({
          ...this.state,
          fetchedData: foodItems,
          openTabs,
          isFetching: false
        });
      })
      .catch(err => {
        // Handle error!
      });
    //}, 2000);
  }

  toggleTab = tabIdx => {
    const newOpenTabs = this.state.openTabs;
    newOpenTabs[tabIdx] = !newOpenTabs[tabIdx];
    this.setState({
      ...this.state,
      openTabs: newOpenTabs
    })
  };

  render() {
    if (this.state.isFetching) {
      return (
        <PageContainer>
          <h1>List</h1>
          <p>Hey, just give us one moment!</p>
        </PageContainer>
      );
    }

    return (
      <PageContainer>
        <h1>List</h1>
        <ListContainer>
          {this.state.fetchedData.map((item, itemIdx) => (
            <ListItem
              key={itemIdx}
              isGoodFood={item.isGoodFood}
              onClick={() => this.toggleTab(itemIdx)}
            >
              <ListItemHeader>
                <span>{item.title}</span>
                <ListItemHeaderIcon
                  icon={faChevronRight}
                  isOpenTab={this.state.openTabs[itemIdx]}
                />
              </ListItemHeader>
              {this.state.openTabs[itemIdx] ? (
                <ListItemBody>
                  this is extra information<br />
                  this is extra information<br />
                  this is extra information<br />
                  this is extra information<br />
                  this is extra information<br />
                  this is extra information<br />
                  this is extra information<br />
                  this is extra information<br />
                  this is extra information<br />
                  this is extra information<br />
                  this is extra information<br />
                  this is extra information<br />
                  this is extra information<br />
                  this is extra information<br />
                  this is extra information<br />
                </ListItemBody>
              ) : ''}
            </ListItem>
          ))}
        </ListContainer>
      </PageContainer>
    );
  } 
}

export default List;