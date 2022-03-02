






import React, { Fragment, useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import axios from 'axios'

import styles from './Tracks.module.css'



const Tracks = () => {

    let { slug } = useParams()

    const [fetchedArtist, setFetchedArtist] = useState('')

    useEffect(() => {

            if (slug !== '') {
                axios.get(`https://api.spotify.com/v1/albums/${slug}/tracks`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.jwtToken}`
                    }
                }).then(response => {
                    setFetchedArtist(response.data.items)
                    console.log('Albums Traks: ', response.data.items)
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
            <span className={styles.container}> List of <span style={{fontWeight: '600'}}>{fetchedArtist && fetchedArtist[0].artists[0].name}</span> album tracks</span>
            {
                fetchedArtist && fetchedArtist.map(item => <div  key={item.id} className={styles.artistCover}>
                    {item.name}
                </div>)
            }
        </div>

    </Fragment>
}

export default Tracks