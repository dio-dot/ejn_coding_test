import React from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import styled from "styled-components";
import Alert from "./etc/Alert";
import Filter from "./Filter";

function App() {
  return (
    <AppLayout>
      <Menu>
        <Filter />
      </Menu>
      <ContentLayout>
        <Header>
          <TodoForm />
        </Header>
        <Content>
          <TodoList />
        </Content>
        <Alert />
      </ContentLayout>
    </AppLayout>
  );
}
const AppLayout = styled.div``;
const Menu = styled.div`
  width: calc(50% - 300px);
  position: fixed;
`;
const ContentLayout = styled.div`
  position: relative;
  width: 600px;
  margin: 0 auto;
`;
const Header = styled.div`
  position: fixed;
  top: 0;
  left: auto;
  right: auto;
  width: inherit;
  height: 150px;
  background: white;
  z-index: 9999;
  box-shadow: 0px 1px 0px 0px #e6e6e6;
`;
const Content = styled.div`
  padding-top: 150px;
  width: 100%;
`;

export default App;
