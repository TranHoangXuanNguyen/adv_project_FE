import { useParams } from 'react-router-dom';

export default function UserDetail() {
  const { id } = useParams();
  return <h2>Thông tin người dùng: {id}</h2>;
}
