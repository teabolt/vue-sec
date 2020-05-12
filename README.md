# vue-sec

Examples of web security in a Vue.js sample website.

In this sample website users can post reviews with a title and description. Reviews are then shown to other users upon subsequent visits.

## XSS (Cross Site Scripting)

In an XSS vulnerability a malicious user posts content that has executable code. When another user views that content, malicious code gets executed in their browser.

In the unsecure version of the website, we can enter the following as a review's description
`<a onmouseover=alert('hacked')>link</a>`. Thus, upon hovering the link arbitrary JavaScript will run.

Thankfully Vue.js protects against the insertion of raw `<script>` tags, even if we use `v-html` (inject HTML). However, we can still insert JavaScript through events on other elements.

To fix this issue, avoid using `v-html`. Vue.js escapes content in mustaches {{ }} by default.
