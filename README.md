# O(fast)

O(fast) is created by students for students. We want to help you learn! We believe in learning by doing which is why we created a set of interactive tutorials to help students learn about data structures and algorithms for competitive programming applications.
 
## Creating Lessons
- Our lessons are created using [MDX](https://mdxjs.com/), which combines [JSX](https://react.dev/learn/writing-markup-with-jsx) and [markdown](https://www.markdownguide.org/). 

- We do not support dynamic imports/exports. However, we provide some statically imported components for incorporating common lesson features:
  - [MCQBlock](src/components/MCQBlock.tsx)
  - [FITBBlock](src/components/FITBBlock.tsx)

- For writing lessons and viewing rendered MDX code in the O(fast) environment, feel free to utilize O(fast)'s [MDX Playground](https://ofast.io/playground).

- Open `src/lessons.json` and add an entry for the new lesson. The key should be a lesson ID that is not already used by other lessons. The value should be an object with the properties: `lessonName`, `lessonGroup`, and `files`. The `lessonName` property stores a string with the lesson's name. The `lessonGroup` property stores a string with the name of the lesson group the lesson belongs to. These two properties are used to create a link to the lesson on the Learn page. `files` is an array of strings that represent the paths to mdx lesson files, which store the lesson content. 

- Go to `public/lessons` and create a new subdirectory with the name of the lesson ID created in the previous step. Inside this folder, create mdx files to write lesson content in. If you haven't already, go back to `src/lessons.json` and populate the `files` array with the paths to these mdx files, relative to the new lesson subdirectory. In most cases this will simply be the names of the mdx files. 

- Refer to existing entries in `src/lessons.json` for examples.
