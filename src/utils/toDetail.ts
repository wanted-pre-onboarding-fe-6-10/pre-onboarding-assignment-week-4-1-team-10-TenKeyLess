import { NavigateFunction, useNavigate } from 'react-router-dom';

type Url = '/user/' | '/account/';

const toDetail = (nav: NavigateFunction, url: Url, id: number | string) => {
  nav(url + id);
};

export default toDetail;
