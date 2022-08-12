import { onAppError } from '../Actions';
import { userPreferenceFetched, userPreferenceRequestStarted } from '../UserPreferenceActions';
import UserPreferenceFetch from '../../../fetch/UserPreferenceFetch';
import {reportError} from './AppErrorThunk'

export function fetchUserPreference(productCode) {
    return function (dispatch) {
        dispatch(userPreferenceRequestStarted());

        return UserPreferenceFetch.search(productCode)
        .then(
            json => dispatch( userPreferenceFetched(json) )
        )
        .catch((error) => {
            dispatch( onAppError(error) )
            dispatch(reportError(error));
        });
    }
}
/**
 *
 * @param preference - an object containing all the preferences for the current user
 */
export function saveUserPreference(preference, productCode) {
    return function(dispatch) {
        dispatch(userPreferenceRequestStarted());

        return UserPreferenceFetch.save(preference, productCode).then(
            json => dispatch(userPreferenceFetched(preference)),// store the new preferences
            error => dispatch(onAppError(error))
        ).catch((error) => {
            dispatch(reportError(error));
        });
    }
}