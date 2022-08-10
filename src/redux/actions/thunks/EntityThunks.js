// ACTIONS
import {
  entityDetailFetched,
  entityDetailsRequestStarted,
  entityDetailsRequestError,
  entitySelected,
  dotFetched,
  welfareSummariesFetched,
  welfareBrokerSummariesFetched,
  welfareBrokerSummariesHistoryFetched,
  welfareLinesOfBusinessFetched,
  welfareServiceProviderSummariesFetched,
  welfareServiceProvidersFetched,
  retirementSummariesFetched,
  retirementPlansFetched,
  retirementPlansHistoryFetched,
  retirementProviderSummariesFetched,
  retirementServiceProvidersFetched,
  wcFetched,
  oshaReportFetched,
  whdReportFetched,
} from "../Actions";
import { ebPlansAndServicesFilterReset } from "../EbPlansAndServicesActions";
import { pcPoliciesAndModsFilterReset } from "../PcPoliciesAndModsActions";
// THUNKS
import { fetchContacts } from "./ContactsThunks";
import { fetchDot } from "./DotThunks";
import { fetchHazards } from "./HazardThunks";
import { fetchWc } from "./WcThunks";
import { fetchOshaReport } from "./OshaThunks";
import { fetchProperty } from "./PropertyThunks";
import { fetchWhdReport } from "./WhdThunks";
import { fetchUserNotes } from "./UserNotesThunks";
import { fetchDupAmsAccounts } from "./DupAmsAccountsThunks";
import { fetchLaunchDarkly } from "./LaunchDarklyThunk";
import {
  fetchWelfareSummaries,
  fetchWelfareLinesOfBusiness,
  fetchWelfareBrokerSummaries,
  fetchWelfareBrokerSummariesHistory,
  fetchWelfareServiceProviderSummaries,
  fetchWelfareServiceProviders,
} from "./WelfareThunks";
import {
  fetchRetirementSummaries,
  fetchRetirementPlans,
  fetchRetirementPlansHistory,
  fetchRetirementProviderSummaries,
  fetchRetirementServiceProviders,
} from "./RetirementThunks";
import { fetchTop10Brokers } from "./BrokersThunks";
import { fetchTop10Carriers } from "./CarriersThunks";
import {
  getWelfareFilingsForMsid,
  getRetirementFilingsForMsid,
} from "./FilingsThunks";
import EntityFetch from "../../../fetch/EntityFetch";
import { reportError } from "./AppErrorThunk";
import AppStore from "../../../fetch/AppFetch";
// LIBS
import Helper from "../../../lib/Helper";
import {
  welfareFilingsFetched,
  retirementFilingsFetched,
} from "../FilingsActions";
// CONSTANTS
import {
  LD_AMS_ACCOUNTS_LIST_VIEW,
  USER_TYPE_ZYWAVE,
} from "../../../lib/config/appConstants";
// CONFIG
import AppConfig from "../../../AppConfig";

export function fetchEntityDetail(muns) {
  return function (dispatch) {
    dispatch(entityDetailsRequestStarted());

    return EntityFetch.getEntity(muns)
      .then((json) => dispatch(entityDetailFetched(json)))
      .catch((error) => {
        dispatch(reportError(error));
        dispatch(entityDetailsRequestError(error));
      });
  };
}
/**
 * Thunk that conditionally dispatches the various fetch actions to get all the details for an entity
 */
export function selectEntity(entity, fetchAll) {
  // An empty summary to dispatch if we decide not to bother calling fetch
  const jsonEmptySummaries = {
    muns: entity.muns,
    reports: [],
  };

  return function (dispatch, getState) {
    const { EntityDetails, ModuleState } = getState();
    const { selectedEntity, lastSelectedModule } = EntityDetails;
    const { module } = ModuleState;

    // Always fetch user notes for each selected entity and module
    dispatch(fetchUserNotes(entity.muns, module.toLowerCase()));

    // Always fetch dup ams accoutns for each selectd entity
    if (AppConfig.enableAmsMiedgeCreateAccount) {
      const userinfo = AppStore.fetchUserInfo();
      const zywaveUserInfo = AppStore.fetchZywaveUserInfo();
      // only zywave user access and enabled has_ams
      if (
        userinfo?.account_type === USER_TYPE_ZYWAVE &&
        zywaveUserInfo?.has_ams === true
      ) {
        dispatch(fetchDupAmsAccounts(entity));
        // // Always check feature toggle ams-accounts-list-view
        dispatch(fetchLaunchDarkly(LD_AMS_ACCOUNTS_LIST_VIEW));
      }
    }

    if (
      selectedEntity !== null &&
      selectedEntity.muns === entity.muns &&
      lastSelectedModule !== null &&
      lastSelectedModule === module
    ) {
      // the entity is already selected in the proper module so no need to load it all over again
      // if the module changed, we should load again to get the right data for the module
      return;
    }

    // We always dispatch the following
    dispatch(entitySelected(entity, module));
    dispatch(fetchEntityDetail(entity.muns));
    dispatch(fetchContacts(entity.muns)); // Always fetch contacts

    // Welfare
    if (hasEntitySource(entity.sources, "F5500") || fetchAll) {
      dispatch(fetchWelfareSummaries(entity.muns));
      dispatch(fetchWelfareBrokerSummaries(entity.muns));
      // for welfare LOBs we need to pass some params based on module

      dispatch(fetchWelfareLinesOfBusiness(entity.muns));
      dispatch(
        fetchWelfareServiceProviderSummaries(
          entity.muns,
          module === "EB" ? null : 5
        )
      );
      dispatch(fetchWelfareServiceProviders(entity.muns));
      if (module === "EB") {
        dispatch(fetchWelfareBrokerSummariesHistory(entity.muns, "bin", 10));
      }
    }

    if (!hasEntitySource(entity.sources, "F5500") || fetchAll) {
      dispatch(welfareSummariesFetched(jsonEmptySummaries));
      dispatch(welfareBrokerSummariesFetched(jsonEmptySummaries));
      dispatch(welfareLinesOfBusinessFetched(jsonEmptySummaries));
      dispatch(welfareServiceProviderSummariesFetched(jsonEmptySummaries));
      dispatch(welfareServiceProvidersFetched(jsonEmptySummaries));
      if (module === "EB") {
        dispatch(welfareBrokerSummariesHistoryFetched(jsonEmptySummaries));
      }
    }
    // Retirement
    if (
      hasEntitySource(entity.sources, "F5500 SF") ||
      hasEntitySource(entity.sources, "F5500") ||
      fetchAll
    ) {
      dispatch(fetchRetirementSummaries(entity.muns));
      dispatch(fetchRetirementPlans(entity.muns, 1, true, true));
      if (module === "EB" || fetchAll) {
        dispatch(fetchRetirementPlansHistory(entity.muns));
        dispatch(fetchRetirementServiceProviders(entity.muns));
      }
      dispatch(
        fetchRetirementProviderSummaries(
          entity.muns,
          module === "EB" ? null : 5
        )
      );
    } else {
      dispatch(retirementSummariesFetched(jsonEmptySummaries));
      dispatch(retirementPlansFetched(jsonEmptySummaries));
      if (module === "EB") {
        dispatch(retirementPlansHistoryFetched(jsonEmptySummaries));
        dispatch(retirementServiceProvidersFetched(jsonEmptySummaries));
      }
      dispatch(retirementProviderSummariesFetched(jsonEmptySummaries));
    }

    // WC (eb needs wcReport for brokers)
    if (hasEntitySource(entity.sources, "WC", true)) {
      dispatch(fetchWc(entity.muns));
    } else {
      dispatch(wcFetched(null));
    }

    if (module === "EB" || fetchAll) {
      //Reset the Plans and Services filters
      dispatch(ebPlansAndServicesFilterReset());
      // We only dispatch the following in EB
      // Top10Carriers
      let searchCounty =
        !Helper.isASmallState(entity.state) && entity.county
          ? entity.county
          : "";
      dispatch(fetchTop10Carriers(entity.muns, entity.state, searchCounty));
      // Top10Brokers
      dispatch(fetchTop10Brokers(entity.muns, entity.state, searchCounty));
      // Filings
      if (
        hasEntitySource(entity.sources, "F5500") ||
        hasEntitySource(entity.sources, "F5500 SF") ||
        fetchAll
      ) {
        dispatch(getWelfareFilingsForMsid(entity.muns));
        dispatch(getRetirementFilingsForMsid(entity.muns));
      } else {
        dispatch(
          welfareFilingsFetched({
            msid: entity.muns,
            welfareFilings: [],
            count: 0,
          })
        );
        dispatch(
          retirementFilingsFetched({
            msid: entity.muns,
            retirementFilings: [],
            count: 0,
          })
        );
      }
    }
    // We only dispatch the following in P&C
    if (module === "PC" || fetchAll) {
      //Reset the Policies and Mods filters
      dispatch(pcPoliciesAndModsFilterReset());
      if (
        // Fetch Hazards only if we have a valid lat/lng
        entity.latitude !== null &&
        entity.latitude !== 0 &&
        entity.longitude !== null &&
        entity.longitude !== 0
      ) {
        dispatch(fetchHazards(entity.latitude, entity.longitude));
      }
      if (hasEntitySource(entity.sources, "DOT") || "fetchAll") {
        // Fetch DOT only if we have do_summary
        dispatch(fetchDot(entity.muns));
      } else {
        let dotReport = {
          muns: entity.muns,
          summaryData: null,
          summaryDataTotal: {
            number_of_inspections: 0,
            number_of_violations: 0,
            number_of_vehicle_violations: 0,
            number_of_driver_violations: 0,
            number_of_hazmat_basic_violations: 0,
            number_of_out_of_service_violations: 0,
            number_of_crashes: 0,
            number_of_fatalities: 0,
          },
        };
        dispatch(dotFetched(dotReport));
      }
      // OSHA
      if (entity.latest_osha_inspection_data || fetchAll) {
        dispatch(fetchOshaReport(entity.muns));
      } else {
        dispatch(
          oshaReportFetched({
            muns: entity.muns,
            summary: null,
            summaryData: [],
          })
        );
      }
      // WHD
      if (entity.latest_whd_action_data || fetchAll) {
        dispatch(fetchWhdReport(entity.muns));
      } else {
        dispatch(whdReportFetched({ muns: entity.muns, report: {} }));
      }
      dispatch(
        fetchProperty(
          entity.muns,
          entity.address_one,
          entity.address_two,
          entity.city,
          entity.state,
          entity.zip_code,
          10
        )
      );
    }
  };
}

export function searchEntityByMuns(muns, searchApiSuffix = "pnc") {
  if (!muns) {
    return null;
  }

  return function (dispatch) {
    EntityFetch.searchEntities(
      {
        entity_search_criteria: {
          muns_numbers: [muns],
        },
      },
      10,
      null,
      null,
      null,
      searchApiSuffix,
      false
    )
      .then((searchResults) => {
        if (searchResults && searchResults.hits) {
          dispatch(selectEntity(searchResults.results[0], true));
        }
      })
      .catch((error) => {
        dispatch(reportError(error));
      });
  };
}

export function searchEntityByMunsFetchAll(muns, searchApiSuffix = "pnc") {
  if (!muns) {
    return null;
  }

  return function (dispatch) {
    EntityFetch.searchEntities(
      {
        entity_search_criteria: {
          muns_numbers: [muns],
        },
      },
      10,
      null,
      null,
      null,
      searchApiSuffix,
      false
    )
      .then((searchResults) => {
        if (searchResults && searchResults.hits) {
          dispatch(selectEntity(searchResults.results[0], true));
        }
      })
      .catch((error) => {
        dispatch(reportError(error));
      });
  };
}

function hasEntitySource(sources, sourceName, isStart = false) {
  let ret = false;
  if (sources) {
    let retSource = sources.filter(
      (source) =>
        (isStart && source.name.indexOf(sourceName) === 0) ||
        source.name === sourceName
    );
    ret = retSource && retSource.length > 0 ? true : false;
  }
  return ret;
}
