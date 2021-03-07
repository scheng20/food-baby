import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import firebase from "firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Navbar from "./Navbar"

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
  background-color: ${props => props.isGoodFood == 0 ? '#C7DDA8' : props.isGoodFood == 1 ? '#FEFFCC': '#F3C6C6'};
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

    findFood(item) {
        return firebase.firestore().collection("foods").doc(item).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                doc.data().name = item;
                const data = {
                    name: item,
                    class: doc.data().class,
                    desc: doc.data().desc
                }
                return data;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    async componentDidMount() {
        const foodItems = [];
        const openTabs = [];
        console.log("itemList", this.props.itemList);
        for (let item of this.props.itemList) {
            await this.findFood(item).then(result => {
                foodItems.push(result);
                openTabs.push(false);
            });
        };

        this.setState({
            ...this.state,
            fetchedData: foodItems,
            openTabs,
            isFetching: false
        });
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
            <div className = "container">
                <div className = "row top-bar">
                    <div className = "col">
                        <h1 className = "h1-not-abs">List</h1>
                    </div>
                    <div className = "col">
                        <a href="/">
                        <i class="fas fa-home fas-brown fa-lg"></i>
                        </a>
                    </div>
                </div>
                <ListContainer>
                    {this.state.fetchedData.map((item, itemIdx) => (
                        <ListItem
                            key={itemIdx}
                            isGoodFood={item.class}
                            onClick={() => this.toggleTab(itemIdx)}
                        >
                            <ListItemHeader>
                                <span>{item.name}</span>
                                <ListItemHeaderIcon
                                    icon={faChevronRight}
                                    isOpenTab={this.state.openTabs[itemIdx]}
                                />
                            </ListItemHeader>
                            {this.state.openTabs[itemIdx] ? (
                                <ListItemBody>
                                    {item.desc}
                                </ListItemBody>
                            ) : ''}
                        </ListItem>
                    ))}
                </ListContainer>
                <Navbar/>
            </div>
        );
    }
}

export default List;