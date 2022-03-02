

import { useState, useEffect, Fragment } from 'react'

import axios from 'axios'
import qs from 'qs'

import { Link } from 'react-router-dom';

import 'antd/dist/antd.css'
import { Input } from 'antd';

import styles from './ArtistSearch.module.css'

const ArtistsSearch = ({ artist }) => {

    const [fetchedArtist, setFetchedArtist] = useState('')
    const [value, setValue] = useState('')

    const client_id = 'key must be provided. When test it ask me for my key.'
    const client_secret = 'key must be provided. When test it ask me for my key.'

    const headers = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
            username: client_id,
            password: client_secret,
        },
    }
    const data = {
        grant_type: 'client_credentials',
    }
    // -------------------------------------------------
    useEffect(() => {

        axios.post(
            'https://accounts.spotify.com/api/token',
            qs.stringify(data),
            headers
        ).then(response => {
            // console.log('Token', response.data.access_token)
            localStorage.setItem('jwtToken', response.data.access_token)

            if (value !== '') {
                axios.get(`https://api.spotify.com/v1/search?query=${value}&type=artist&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=20`, {
                    headers: {
                        'Authorization': `Bearer ${response.data.access_token}`
                    }
                }).then(response => {
                    setFetchedArtist(response.data.artists.items)
                    console.log(response.data.artists.items)
                }).catch(err => {
                    console.log('Error from Spotify api: ', err)
                    setFetchedArtist('')
                })
            } else {
                setFetchedArtist('')
            }
        }).then(err => console.log(err))
    }, [value])
    // -----------------------------------------------

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    return <Fragment>

        <div className={styles.container}>
            <Input
                placeholder="Type an Artist"
                value={value}
                onChange={handleChange}
            />
        </div>

        <div className={styles.containerArtists}>
            {
                fetchedArtist && fetchedArtist.map(item => <Link to={`/ArtistAlbums/${item.id}`} key={item.id} className={styles.artistCover}>
                    {item.name}
                </Link>)
            }
        </div>

    </Fragment>
}

export default ArtistsSearch