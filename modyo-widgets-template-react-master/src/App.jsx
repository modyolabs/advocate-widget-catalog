import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next';
import Repository from './repositories/RepositoryFactory';
import liquidParser from './liquid/liquidParser';
import ExampleComponent from './components/ExampleComponent/component.jsx';

import './App.scss';

const PostRepository = Repository.get('posts');

function App() {
  const {t} = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const year = new Date().getFullYear();
  const siteName = liquidParser.parse('{{site.name}}');
  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await PostRepository.getTop(3);
      const postsResponse = response.entries.map((entry) => ({
        description: entry.fields.description,
        id: entry.meta.uuid,
        title: entry.fields.title,
        slug: entry.fields.slug,
        image: entry.fields.covers ? entry.fields.covers[0].url : '',
        imageAlt: entry.fields.covers ? entry.fields.covers[0].alt_text : '',
      }));
      setPosts(postsResponse);
      return postsResponse;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="test-app">
      <div className="pt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8 text-center">
              <h1 className="mb-3">
                {t('title')}
              </h1>
              <h2 className="h4 mb-4">
                Welcome to the Minimal theme.
                This is an HTML widget that you can modify in the Page Builder section.
                You can also modify the style in the Template Builder section.
              </h2>
              <a
                className="btn btn-primary btn-lg"
                href="https://www.modyo.com"
              >
                Go to Modyo
              </a>
              <a
                className="btn btn-outline-primary ml-2 btn-lg"
                href="https://docs.modyo.com"
              >
                Read the docs
              </a>
            </div>
          </div>
          <div className="mt-2">
            <img
              src="https://cloud.modyocdn.com/uploads/2addb891-7316-4cfb-882a-f0fd9745bf3a/original/homeMinimal.png"
              alt="modyo"
            />
          </div>
        </div>
      </div>
      <div className="bg-light py-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8 text-center">
              <h2 className="mb-3">
                Create and launch digital products faster
              </h2>
              <p className="text-muted mb-4">
                Welcome to the Minimal theme.
                This is an HTML widget that you can modify in the Page Builder section.
                You can also modify the style in the Template Builder section.
              </p>
              <div className="px-5 my-5">
                <img
                  className="w-50"
                  src="https://cloud.modyocdn.com/uploads/8ab8adac-898d-4c38-a878-8788a4b3df0f/original/diseno.png"
                  alt="modyo"
                />
              </div>
              <a
                className="btn btn-outline-primary"
                href="http://www.modyo.com"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8 text-center">
              <div className="row">
                { loading
                  ? (<h1>cargando</h1>)
                  : posts.map((post) => (
                    <ExampleComponent key={post.id} post={post} />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <div
          id="footer"
          className="py-5 mt-4"
          role="contentinfo"
        >
          <div className="container">
            <div className="mt-2 pt-2 border-top d-flex">
              <span>
                { siteName }
                {' '}
                &copy;
                { year }
              </span>

              <span className="ml-auto">
                Made with
                <FontAwesomeIcon
                  icon="heart"
                  color="red"
                  className="mx-2"
                />
                in
                {' '}
                <a href="https://www.modyo.com">Modyo CLI</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
