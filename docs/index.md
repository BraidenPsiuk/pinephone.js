# [ THIS PAGE IS STILL UNDER CONSTRUCTION ]

## What is FIXAR?

FIXAR gives you full control over how your 2D/3D scene is viewed. It automatically resizes your scene to make it as large as possible while maintaining an aspect ratio *you* define (and can change at any time). It does this by creating a letterboxing/pillarboxing effect, which avoids stretching or cropping (which can look ugly or cause a loss of detail, respectively).

## Understanding FIXAR's dependency model

If you take a look at NPM, FIXAR does not have any listed dependencies. However, it won't do anything on it's own! Although this may be a little confusing, the dependency model offered by NPM doesn't seem to be sufficient for this library's needs.

FIXAR requires *at least* one graphics rendering library of your choice to work. I originally only designed it to work with Three.js, and that was it. In that original version, Three.js would have been made a dependancy. However, I realized that FIXAR might become more popular if multiple libraries were supported instead of just Three.js.

**Your take-away should simply be this:** There are no listed dependencies, but FIXAR needs **at least one** library to work. Include one of more libraries in your project, and then simply call ```FIXAR.use(lib1, lib2, lib3, etc...);``` to allow FIXAR access to them. You don't need to do anything to specify the library name(s), FIXAR figures that out for you, and will **scream scarry red errors** at you if it has any trouble.

*Just kidding, I tried to make the errors as readible as possible. If you get an error and you're not sure what it means, don't be afraid to open an issue on Github!*

### Usage (Codepen)

note for me: three example should be green spinning cube, pixi should be sprite on stage moving on x (https://pixijs.io/guides/basics/getting-started.html), Babylon can be something more complex maybe like their Babylon Editor shooter demo, but that demo is trash bc they don't even use WASD like come on Microsoft get your shit together at least TELL me you don't use normal keymappings in your shooter demo before I spend like 20 minutes thinking I failed to do something correctly in my project files or Node.js config

<details>
<summary>Three.js</summary>
<br>

```javascript
import * as THREE from "https://unpkg.com/three@latest/build/three.module.js";
import * as FIXAR from "https://unpkg.com/fixar@latest/fixar.js"; // TODO: add fixar.min.js
// These examples do not work yet, they are just placeholders!
// REPLACE ABOVE WITH SKYPACK LINKS since codepen uses skypack
```

</details>
<details>
<summary>PixiJS</summary>
<br>
(add example)
</details>

### Usage (Local)

```javascript
import * as THREE from "three";
import * as FIXAR from "fixar"; // TODO: add fixar.min.js
// These examples do not work yet, they are just placeholders!
```

### Usage (Local)

```javascript
import * as THREE from "https://unpkg.com/three@latest/build/three.module.js";
import * as FIXAR from "https://unpkg.com/fixar@latest/fixar.js"; // TODO: add fixar.min.js
// These examples do not work yet, they are just placeholders!
```

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [Basic writing and formatting syntax](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/BraidenPsiuk/fixar.js/settings/pages). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://docs.github.com/categories/github-pages-basics/) or [contact support](https://support.github.com/contact) and we’ll help you sort it out.
