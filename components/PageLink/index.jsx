import React from 'react'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import moment from 'moment'
import { prefixLink } from 'gatsby-helpers'
import access from 'safe-access'

class PageLink extends React.Component {
  render() {
    const page = this.props.page
    const title = access(page, 'data.title') || page.path
    const description = access(page, 'data.description')
    const datePublished = access(page, 'data.date')
    const category = access(page, 'data.category')

    return(
      <div className='blog-post'>
        <time dateTime={ moment(datePublished).format('MMMM D, YYYY') }>
          { moment(datePublished).format('MMMM YYYY') }
        </time>
        <span style={ {    padding: '5px'} }></span>
        <span className='blog-category'>{ category }</span>
        <h2><Link style={ {    borderBottom: 'none',} } to={ prefixLink(page.path) } > { title } </Link></h2>
        <p dangerouslySetInnerHTML={ {    __html: description} } />
        <Link className='readmore' to={ prefixLink(page.path) }> Read
        </Link>
      </div>
    );
  }
}

export default PageLink
