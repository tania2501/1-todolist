describe('addItemForm', () => {
  it('base example, visually looks correct', async () => {
      // APIs from jest-puppeteer
      await page.goto('http://localhost:9009/iframe.html?id=todolist-superinput--super-input-base')
      await page.waitForTimeout(3000)
      const image = await page.screenshot()
      // API from jest-image-snapshot
      expect(image).toMatchImageSnapshot()
  })
}) 
