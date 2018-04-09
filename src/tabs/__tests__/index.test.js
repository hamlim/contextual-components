import React from 'react'
import { render } from 'react-testing-library'
import { Tabs, Tab, Consumer } from '../index'

describe('Tabs', () => {
  describe('Tab', () => {
    it('passes handleCollapseClick and isActive to each collapse panel', () => {
      const tabRender = jest.fn()
      const renderWrap = args => {
        tabRender(args)
        return null
      }
      render(
        <Tabs>
          <Tab tabId="1">{renderWrap}</Tab>
        </Tabs>,
      )
      expect(tabRender).toHaveBeenCalledWith(
        expect.objectContaining({
          handleTabClick: expect.any(Function),
          isTabActive: expect.any(Boolean),
        }),
      )
    })

    it('accepts a prop called render optionally', () => {
      const tabRender = jest.fn()
      const renderWrap = args => {
        tabRender(args)
        return null
      }
      render(
        <Tabs>
          <Tab tabId="1" render={renderWrap} />
        </Tabs>,
      )
      expect(tabRender).toHaveBeenCalledWith(
        expect.objectContaining({
          handleTabClick: expect.any(Function),
          isTabActive: expect.any(Boolean),
        }),
      )
    })

    it('has isTabActive set to true if its tabId matches Tabs activeTab', () => {
      let isTabActive
      const renderWrap = args => {
        isTabActive = args.isTabActive
        return null
      }
      render(
        <Tabs activeTab="1">
          <Tab tabId="1">{renderWrap}</Tab>
        </Tabs>,
      )
      expect(isTabActive).toEqual(true)
    })
  })

  it('updates the activeTab if provided a new activeTab prop', () => {
    const renderSpy = jest.fn()
    const initialActiveTab = 'a'
    const { container } = render(
      <Tabs activeTab={initialActiveTab}>
        <Tab tabId="a">
          {({ activeTab }) => {
            renderSpy(activeTab)
            return null
          }}
        </Tab>
      </Tabs>,
    )
    expect(renderSpy).toHaveBeenCalledWith(initialActiveTab)
    const newActiveTab = 'b'
    render(
      <Tabs activeTab={newActiveTab}>
        <Tab tabId="b">
          {({ activeTab }) => {
            renderSpy(activeTab)
            return null
          }}
        </Tab>
      </Tabs>,
      { container },
    )
    expect(renderSpy).toHaveBeenCalledWith(newActiveTab)
  })
})
