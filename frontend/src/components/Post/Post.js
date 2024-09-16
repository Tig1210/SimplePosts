import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { getCardById } from '../../api/cards'
import { addComment, getCommentsById } from '../../api/comments'

import styles from './Post.module.scss'

export default function Post() {
  const decode = jwtDecode(sessionStorage.getItem('auth'))

  const params = useParams()

  const [post, setPost] = useState()
  const [comment, setComment] = useState()
  const [listOFComments, setListOFComments] = useState([])

  const { error } = useQuery(
    ['cardId', params.id],
    () => getCardById(params.id),
    {
      retry: 0,
      onSuccess: (data) => {
        setPost(data)
      },
    }
  )

  console.log(error)

  const { isLoading, refetch } = useQuery(
    ['comentById', params.id],
    () => getCommentsById(params.id),
    {
      retry: 0,
      onSuccess: (data) => {
        setListOFComments(data)
      },
    }
  )

  console.log(isLoading)

  const { mutate } = useMutation(
    () => addComment({ postId: params.id, userId: decode.id, text: comment }),
    {
      onSuccess: (data) => {
        console.log(data)
        refetch()
      },
    }
  )

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {post !== undefined ? (
          <>
            <div className={styles.info}>{post.text}</div>
            <div className={styles.comments}>
              <div className={styles.bl}>
                <div>
                  <input onChange={(e) => setComment(e.target.value)} />
                  <button
                    onClick={() => {
                      mutate()
                    }}
                  >
                    Добавить
                  </button>
                </div>
                <div className={styles.list}>
                  {listOFComments.map((comment) => (
                    <div key={comment.id} className={styles.comm}>
                      <p>{comment.text}</p>
                      <div className={styles.line}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
