import React from 'react'
import { render } from 'react-testing-library'
import {
  Accordion,
  CollapsePanel,
  Consumer,
} from '../index'

describe('Accordion', () => {
  describe('CollapsePanel', () => {
    it('passes handleCollapseClick and isActive to each collapse panel', () => {
      const collapseRender = jest.fn()
      const renderWrap = args => {
        collapseRender(args)
        return null
      }
      render(
        <Accordion>
          <CollapsePanel panelId="1">
            {renderWrap}
          </CollapsePanel>
        </Accordion>,
      )
      expect(collapseRender).toHaveBeenCalledWith(
        expect.objectContaining({
          handleCollapseClick: expect.any(Function),
          isActive: expect.any(Boolean),
        }),
      )
    })

    it('accepts a prop called render optionally', () => {
      const collapseRender = jest.fn()
      const renderWrap = args => {
        collapseRender(args)
        return null
      }
      render(
        <Accordion>
          <CollapsePanel panelId="1" render={renderWrap} />
        </Accordion>,
      )
      expect(collapseRender).toHaveBeenCalledWith(
        expect.objectContaining({
          handleCollapseClick: expect.any(Function),
          isActive: expect.any(Boolean),
        }),
      )
    })

    it('has isActive set to true if its panelId is in activePanels', () => {
      let isActive
      const renderWrap = args => {
        isActive = args.isActive
        return null
      }
      render(
        <Accordion activePanels={['1']}>
          <CollapsePanel panelId="1">
            {renderWrap}
          </CollapsePanel>
        </Accordion>,
      )
      expect(isActive).toEqual(true)
    })
  })

  it('updates the activePanels if provided a new activePanels prop', () => {
    const renderSpy = jest.fn()
    const initialActivePanels = ['a']
    const { container } = render(
      <Accordion activePanels={initialActivePanels}>
        <CollapsePanel panelId="a">
          {({ activePanels }) => {
            renderSpy(activePanels)
            return null
          }}
        </CollapsePanel>
      </Accordion>,
    )
    expect(renderSpy).toHaveBeenCalledWith(
      initialActivePanels,
    )
    const newActivePanels = ['a', 'b']
    render(
      <Accordion activePanels={newActivePanels}>
        <CollapsePanel panelId="a">
          {({ activePanels }) => {
            renderSpy(activePanels)
            return null
          }}
        </CollapsePanel>
      </Accordion>,
      { container },
    )
    expect(renderSpy).toHaveBeenCalledWith(newActivePanels)
  })
})
