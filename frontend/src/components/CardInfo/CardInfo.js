import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { deleteCard } from '../../api/cards'
import { allComments } from '../../api/comments'
import { allLikes, likeFunction } from '../../api/like'

import styles from './CardInfo.module.scss'

import { ReactComponent as ActiveHeart } from './icons/active.svg'
import { ReactComponent as CommentIcon } from './icons/comment.svg'
import { ReactComponent as DefaultHeart } from './icons/default.svg'
import { ReactComponent as TrashIcon } from './icons/trash.svg'

export default function CardInfo({ card, refresh }) {
  const decode = jwtDecode(sessionStorage.getItem('auth'))

  const navigate = useNavigate()
  const [likes, setLikes] = useState([])
  const [comments, setComments] = useState([])

  const { mutate } = useMutation((id) => likeFunction(id, decode), {
    onSuccess: (data) => {
      console.log(data)
      refetch()
    },
  })

  const { refetch } = useQuery('allLikes', () => allLikes(), {
    retry: 0,
    onSuccess: (data) => {
      setLikes(data)
    },
  })

  const { error } = useQuery('allComments', () => allComments(), {
    retry: 0,
    onSuccess: (data) => {
      setComments(data)
    },
  })
  console.log(error)

  const { mutate: delCard } = useMutation((id) => deleteCard(id), {
    onSuccess: () => {
      refresh()
    },
  })
  return (
    <div className={styles.card} key={card.id}>
      <div className={styles.bl}>
        <div className={styles.user}>
          {/* <p>{card.userId}</p> */}
          <p onClick={() => navigate(`/profile/${card.userId}`)}>
            {card.userName}
          </p>
          {decode?.id === card.userId ? (
            <TrashIcon
              style={{ width: '20px', height: '20px' }}
              onClick={() => {
                delCard(card.id)
              }}
            />
          ) : (
            ''
          )}
        </div>
        <div>
          <p onClick={() => navigate(`/postInfo/${card?.id}`)}>{card.text}</p>
        </div>

        <div className={styles.like}>
          <div className={styles.l}>
            <div
              className={styles.icon}
              onClick={() => {
                if (card.userId !== decode?.id) {
                  mutate(card?.id)
                }
              }}
            >
              {likes
                .filter((like) => like.userId === decode?.id)
                .some((like) => like.postId === card?.id) ? (
                <ActiveHeart style={{ width: '40px', height: '40px' }} />
              ) : (
                <DefaultHeart style={{ width: '40px', height: '40px' }} />
              )}
            </div>
            <p>{likes.filter((like) => like.postId === card?.id).length}</p>
          </div>
          <div className={styles.l}>
            <div className={styles.icon}>
              <CommentIcon style={{ width: '40px', height: '40px' }} />
            </div>
            <p>
              {comments.filter((comment) => comment.postId === card?.id).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
