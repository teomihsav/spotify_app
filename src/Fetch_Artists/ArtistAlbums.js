



import React, { Fragment, useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import axios from 'axios'

import styles from './ArtistAlbums.module.css'

import { Image } from 'antd';

// test

const ArtisAlbums = () => {

    let { slug } = useParams()

    const [fetchedArtist, setFetchedArtist] = useState('')

    useEffect(() => {
        if (slug !== '') {
            axios.get(`https://api.spotify.com/v1/artists/${slug}/albums`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.jwtToken}`
                }
            }).then(response => {
                setFetchedArtist(response.data.items)
                console.log('Albums: ', response.data.items)
            }).catch(err => {
                console.log('Error from Spotify api: ', err)
                setFetchedArtist('')
            })
        } else {
            setFetchedArtist('')
        }
    }, [])

    return <Fragment>

        <div className={styles.containerArtistDetails}>
            <span className={styles.container}> List of <span style={{ fontWeight: '600' }}>{fetchedArtist && fetchedArtist[0].artists[0].name}</span> albums</span>
            {
                fetchedArtist && fetchedArtist.map(item => <Link to={`/Tracks/${item.id}`} key={item.id} className={styles.artistCover}>
                    {item.name}

                    <Image
                        width={100}
                        src={item.images[0].url}
                    />

                </Link>)
            }
        </div>

    </Fragment>
}

export default ArtisAlbums