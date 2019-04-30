import React from "react"
import { graphql, Link } from "gatsby"

// TODO: styled components

// data: result of pageQuery
const BlogTemplate = ({ data, pageContext }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { allArticles } = pageContext

  return (
    <div>
      <h1>{frontmatter.title}</h1>
      <h2>{frontmatter.date}</h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />

      <p>Other articles</p>
      {allArticles.map(({ node: { frontmatter: { title, date, path } } }) => (
        <div key={title}>
          <p>{date}</p>
          <Link to={path}>{title}</Link>
        </div>
      ))}
    </div>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`

export default BlogTemplate
