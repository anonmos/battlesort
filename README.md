# BattleSort ![CI Shield](https://img.shields.io/circleci/build/github/anonmos/battlesort/main)
Where only the best choices happen.

BattleSort allows you, user, to input a full list of unordered things, compare them one-by-one, then receive the ordered list on the other side.  Want to see it live?  Check out the [demo](https://battlesort.timgrowney.com).

## Motivations
Prioritizing is something we find ourselves doing a lot.  So we built a tool to allow you to give this system a list of strings or numbers and take an event-driven approach to prioritizing that list.  We kept three key things in mind while building this:

- Simplicity.  It should be easy to see how the [demo](https://battlesort.timgrowney.com) fits together with the library so that anybody else can easily use it.

- Utility.  Anybody should be able to add a script tag to their markup or npm install this thing and be able to be up and running quickly.

- Flexibility.  It should be easy to modify by anyone, so we kept the code as simple as possible and open sourced it.

## Local Development of BattleSort
- Install [npm](https://www.npmjs.com/get-npm).
- Install [nvm](https://github.com/nvm-sh/nvm)
- Install [yarn](https://classic.yarnpkg.com/en/docs/install).

- Match the right version of NodeJS to this package with nvm with
  - ```nvm install``` 

- Install the development packages for this project with
  - ```yarn install```

- Make a change to `index.html`.  Then run the command
  - ```yarn run bundle:demo```

- Browse to the `dist` directory and open `index.html` in a browser locally.  You should see everything up and running!

## Using BattleSort on your own page
Get up and running quickly by using the [demo](https://github.com/anonmos/battlesort/blob/main/src/demo.ts) as a reference implementation.  At a high level, here's how it to glue it all together:

- Use a `<script>` tag and point the `src` to the [browser-based library](https://gitcdn.link/cdn/anonmos/battlesort/7432200f51a662cd4aace4d29d255f26990c4e69/dist/battlesort.browser.min.js)

- Gather a list of things the user wants to prioritize/sort (the demo uses a [`<textarea/>`](https://github.com/anonmos/battlesort/blob/main/index.html#L153))

- Create a [callback function](https://github.com/anonmos/battlesort/blob/main/src/demo.ts#L136) for when the list of items is finished being sorted.  BattleSort will call this function and pass it the `finalArray` as an argument.

- [Instantiate a new instance](https://github.com/anonmos/battlesort/blob/main/src/demo.ts#L127) of BattleSort and pass it the array of items (accepts strings or numbers), as well as the callback function from the previous step.

- [Get the first set of displayable items](https://github.com/anonmos/battlesort/blob/main/src/demo.ts#L128).  This will be in the form of [an object](https://github.com/anonmos/battlesort/blob/main/src/battlesort.ts#L11) containing a `comparison` value, and a `pivot` value.  [Show these to the user](https://github.com/anonmos/battlesort/blob/7432200f51a662cd4aace4d29d255f26990c4e69/src/demo.ts#L83) and decide which one is higher priority/greater/more important.

- Once the user decides whether the [pivot is greater](https://github.com/anonmos/battlesort/blob/7432200f51a662cd4aace4d29d255f26990c4e69/src/demo.ts#L6), [comparison](https://github.com/anonmos/battlesort/blob/7432200f51a662cd4aace4d29d255f26990c4e69/src/demo.ts#L16) is greater, or they're [roughly equal](https://github.com/anonmos/battlesort/blob/7432200f51a662cd4aace4d29d255f26990c4e69/src/demo.ts#L26), call the appropriate BattleSort function.  Update the displayable items for the user based on the return value from that function call.

- Repeat the decision/value update calls until your callback function is called.

- [Display the results](https://github.com/anonmos/battlesort/blob/7432200f51a662cd4aace4d29d255f26990c4e69/src/demo.ts#L136) for the user!

## Under the Hood
BattleSort uses an event-driven form of [Quicksort](https://www.digitalocean.com/community/tutorials/js-quick-sort) under the hood, with some further optimizations to reduce the number of choices the user is required to make.  Check out the forthcoming blog posts for more details on how it all works!

## Coming Soon
- npm package for NodeJS
- Custom watcher for development on the self-hosted version of the demo
- Unit tests to make sure future changes don't break anything
- Blog post teardown on how it all works
- More under the [issues](https://github.com/anonmos/battlesort/issues)!
