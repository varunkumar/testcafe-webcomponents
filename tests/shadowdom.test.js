import {
  Selector
} from 'testcafe';

fixture `Web components test`
  .page `../src/index.html`;

test('Test ShadowDom', async t => {
  // This test will work fine as shadow DOM is already in the viewport
  await Selector('#host');
  const textBox = await Selector(() => document.querySelector('#host').shadowRoot.querySelector('#txtTest'));
  await t
    .typeText(textBox, 'Some text')
    .expect(textBox.value).eql('Some text');

  const button = await Selector(() => document.querySelector('#host').shadowRoot.querySelector('#btnTest'));

  await t.click(button);
});

test('Test ShadowDom Scroll', async t => {
  // Increase the height of the container so that items in shadow DOM are not in the viewport
  await t.click('#container');

  // Below action fails as TestCafe doesn't scroll items that are within shadow DOM
  await Selector('#host');
  const textBox = await Selector(() => document.querySelector('#host').shadowRoot.querySelector('#txtTest'));
  await t
    .typeText(textBox, 'Some text')
    .expect(textBox.value).eql('Some text');

  const button = await Selector(() => document.querySelector('#host').shadowRoot.querySelector('#btnTest'));
  await t.click(button);
});