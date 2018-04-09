import React, { createContext } from 'react'

const tabContext = createContext({
  handleTabClick() {},
  activeTab: null,
})

const { Provider, Consumer } = tabContext

class Tabs extends React.Component {
  static defaultProps = {
    stateReducer(tabId) {
      return ({ activeTab }) => {
        return {
          activeTab: tabId,
        }
      }
    },
    activeTab: null,
    defaultActiveTab: null,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.activeTab !== null &&
      nextProps.activeTab !== prevState.activeTab
    ) {
      return {
        __context__: {
          ...prevState.__context__,
          activeTab: nextProps.activeTab,
        },
        activeTab: nextProps.activeTab,
      }
    }
    return null
  }

  handleTabClick = (event, tabId) => {
    this.setState(state => {
      const newState = this.props.stateReducer(tabId)({
        activeTab: state.activeTab,
      })
      return {
        __context__: {
          ...state.__context__,
          activeTab: newState.activeTab,
        },
        activeTab: newState.activeTab,
      }
    })
    this.props.handleTabClick(event, tabId)
  }

  state = {
    activeTab:
      this.props.activeTab ||
      this.props.defaultActiveTab ||
      null,
    __context__: {
      activeTab:
        this.props.activeTab ||
        this.props.defaultActiveTab ||
        null,
      handleTabClick: this.handleTabClick,
    },
  }

  render() {
    return (
      <Provider value={this.state.__context__}>
        {this.props.children}
      </Provider>
    )
  }
}

class Tab extends React.Component {
  render() {
    return (
      <Consumer>
        {({ handleTabClick, activeTab }) => {
          const isTabActive = activeTab === this.props.tabId
          return this.props.render
            ? this.props.render({
                activeTab,
                isTabActive,
                handleTabClick,
              })
            : this.props.children({
                activeTab,
                isTabActive,
                handleTabClick,
              })
        }}
      </Consumer>
    )
  }
}

export { Tabs, Tab, Provider, Consumer }
