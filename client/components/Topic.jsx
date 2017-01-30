import React from 'react'
import { randomBgImg } from '../util'

export default class Topic extends React.Component {
  render() {
    return (
      <div className='page'>
        <div
          className='content'
          style={{backgroundImage: `url(${randomBgImg()})`}}>
          <article>
            <header className="center">
              <h3>Rumee</h3>
            </header>
            <div className='card full'>
              <div className='measure'>
                <h2>Title One</h2>
                <p>Yolo ipsum dolor sit amet, consectetur adipiscing elit. Ut ac suscipit leo. Carpe diem vulputate est nec commodo rutrum. Pellentesque mattis convallis nisi eu and I ain’t stoppin until the swear jar’s full. Ut rhoncus velit at mauris interdum, fringilla dictum neque rutrum. Curabitur mattis odio at erat viverra lobortis. Poppin’ bottles on the ice, tristique suscipit mauris elementum tempus. Quisque ut felis vitae elit tempor interdum viverra a est. Drop it like it’s hot, at pretium quam. In nec scelerisque purus. Nam dignissim lacus ipsum, a ullamcorper nulla pretium non. Aliquam sed enim faucibus, pulvinar felis at, vulputate augue. Ten, ten, twenties on them fifties, trick, at tempus libero fermentum id. Vivamus ut nisi dignissim, condimentum urna vel, dictum massa. Donec justo yolo, rutrum vitae dui in, dapibus tempor tellus. I do it big. Fusce ut sagittis mi.</p>
              </div>
              <div className='right measure space-top'>
                <h2>Title Two</h2>
                <p>Yolo ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mattis convallis nisi eu and I ain’t stoppin until the swear jar’s full. Ut rhoncus velit at mauris interdum, fringilla dictum neque rutrum.</p>
              </div>
              <div className='measure space-top'>
                <h2>The collective question</h2>
                <p>Yolo ipsum dolor sit amet, consectetur adipiscing elit. Ut ac suscipit leo. Carpe diem vulputate est nec commodo rutrum. Pellentesque mattis convallis nisi eu and I ain’t stoppin until the swear jar’s full. Ut rhoncus velit at mauris interdum, fringilla dictum neque rutrum. Curabitur mattis odio at erat viverra lobortis. Poppin’ bottles on the ice, tristique suscipit mauris elementum tempus. Quisque ut felis vitae elit tempor interdum viverra a est. Drop it like it’s hot, at pretium quam. In nec scelerisque purus. Nam dignissim lacus ipsum, a ullamcorper nulla pretium non. Aliquam sed enim faucibus, pulvinar felis at, vulputate augue. Ten, ten, twenties on them fifties, trick, at tempus libero fermentum id. Vivamus ut nisi dignissim, condimentum urna vel, dictum massa. Donec justo yolo, rutrum vitae dui in, dapibus tempor tellus. I do it big. Fusce ut sagittis mi.</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    )
  }
}
