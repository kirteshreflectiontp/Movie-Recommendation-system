import React, { Component } from 'react';
import axios from 'axios';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Rating,
  Typography,
} from '@mui/material';

const TMDB_KEY = '9b69154e469641b26369b57d3e3fb1f5';
const POSTER_ROOT = '	https://image.tmdb.org/t/p/original/';

class RecList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
    };
    this.getTodos = this.getTodos.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }

  async getTodos() {
    let data;
    const link = `https://api.themoviedb.org/3/find/${this.props.movie[1]}?api_key=${TMDB_KEY}&external_source=imdb_id`;
    let js; let title; let rating; let
      poster_path;
    await axios.get(link).then((r) => (js = r.data));
    for (const jsKey in js) {
      if (js[jsKey].length !== 0) {
        if (jsKey === 'movie_results') {

          title = js[jsKey][0].title;
        } else if (jsKey === 'tv_results') {

          title = js[jsKey][0].name;
        }

        rating = js[jsKey][0].vote_average;
        poster_path = js[jsKey][0].poster_path;

      }
    }
    data = [title, rating, poster_path];
    this.setState({ arr: data });
  }

  render() {
    const { arr } = this.state;
    return (
      <div style={{ width: 'inherit', height: '100%' }}>
        {arr ? (
          <CardActionArea
            style={{
              height: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <Card
              style={{
                height: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >

              <CardMedia
                image={POSTER_ROOT + arr[2]}
                title={arr[0]}
                style={{ paddingTop: '100%', width: '100%' }}
              />
              <CardContent>
                <Rating
                  defaultValue={(arr[1] * 1.0) / 2}
                  precision={0.5}
                  readOnly
                />
                <Typography variant="h6" component="h2">
                  {arr[0]}
                </Typography>

              </CardContent>
            </Card>
          </CardActionArea>
        ) : (
          <CircularProgress />
        )}
      </div>
    );
  }
}

export default RecList;
