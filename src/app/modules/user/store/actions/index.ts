import * as UserActions from '../../store/actions/list-users.action';
import * as ManageUserActions from '../../store/actions/manage-user.action';

export const UserAction = {
  ...UserActions,
  ...ManageUserActions
};
