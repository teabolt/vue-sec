# vue-sec

Examples of web security in a Vue.js sample website.

In this sample website users can post reviews with a title and description. Reviews are then shown to other users upon subsequent visits.

## XSS (Cross Site Scripting)

In an XSS vulnerability a malicious user posts content that has executable code. When another user views that content, malicious code gets executed in their browser.

In the insecure version of the website, we can enter the following as a review's description
`<a onmouseover=alert('hacked')>link</a>`. Thus, upon hovering the link arbitrary JavaScript will run.

Thankfully Vue.js protects against the insertion of raw `<script>` tags, even if we use `v-html` (inject HTML). However, we can still insert JavaScript through events on other elements.

To fix this issue, avoid using `v-html`. Vue.js escapes content in mustaches {{ }} by default.

## SQL Injection

In an SQL injection we exploit places in the app where user input is used in SQL queries to a database.

In the insecure version, enter the following as a review's description:
```
amazing product'; DROP TABLE reviews; SET @v1 = 'a
```

Then this value will be substituted as `description` in
```
`INSERT INTO reviews SET \`title\` = '${title}' \`description\` = '${description}'`
```

What happens is as follows:
* `amazing product';` - looks like a legitimate description. However, notice the quote and the semicolon at the end. These will allow for another query to come after the current.
* `DROP TABLE reviews;` - the malicious part. This destroys the table that has all the reviews data. Of course this can be replaced with any other chain of queries such as changing user permissions.
* `SET @v1 = 'a` - this is used to deal with the last quote in `'${description}'`, such that the query becomes valid. Otherwise we will have a dangling ' after the final semicolon that will make the query parsing fail. The command itself creates a new MySQL (our DB flavour) variable and uses ' for a string literal. The query passes without needing a final semicolon in this case.

A couple of ways to fix this vulnerability:
* Disable `multipleStatements` in the SQL driver. This should prevent the chaining of queries with `;`.
* Always escape user data.
* Prefer driver functions over raw SQL queries with variable substitution.
