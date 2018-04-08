import React, { createContext } from 'react'

const accordionContext = createContext({
  handleCollapseClick() {},
  activePanels: [],
})

const { Provider, Consumer } = accordionContext

class Accordion extends React.Component {
  static defaultProps = {
    stateReducer(panelId) {
      return ({ activePanels }) => {
        return {
          activePanels: [...activePanels, panelId],
        }
      }
    },
    activePanels: null,
    defaultActivePanels: null,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.activePanels !== null &&
      nextProps.activePanels !== prevState.activePanels
    ) {
      return {
        __context__: {
          ...prevState.__context__,
          activePanels: nextProps.activePanels,
        },
        activePanels: nextProps.activePanels,
      }
    } else {
      return null
    }
  }

  handleCollapseClick = (event, panelId) => {
    this.setState(state => {
      const newState = this.props.stateReducer(panelId)({
        activePanels: state.activePanels,
      })
      return {
        __context__: {
          ...state.__context__,
          activePanels: newState.activePanels,
        },
        activePanels: newState.activePanels,
      }
    })
    this.props.handlePanelClick(event, panelId)
  }

  state = {
    activePanels:
      this.props.activePanels ||
      this.props.defaultActivePanels ||
      [],
    __context__: {
      activePanels:
        this.props.activePanels ||
        this.props.defaultActivePanels ||
        [],
      handleCollapseClick: this.handleCollapseClick,
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

class CollapsePanel extends React.Component {
  render() {
    return (
      <Consumer>
        {({ handleCollapseClick, activePanels }) => {
          const isActive = activePanels.includes(
            this.props.panelId,
          )
          return this.props.render
            ? this.props.render({
                handleCollapseClick,
                isActive,
                activePanels,
              })
            : this.props.children({
                handleCollapseClick,
                isActive,
                activePanels,
              })
        }}
      </Consumer>
    )
  }
}

export { Accordion, Provider, Consumer, CollapsePanel }
