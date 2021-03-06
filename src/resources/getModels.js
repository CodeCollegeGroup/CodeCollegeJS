import {getData} from './Requests';
import {routeMap} from '../routes/RouteMap';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';

const getActiveChartData = (id) => {
  getData(
    `${routeMap.active_chart}${id}/`,
    (data) => {
      AppDispatcher.dispatch({
        action: ActionType.PATRIMONY.ACTIVECHART,
        data: data,
      });
      // const colors = this.generateRandomColors(data.active_chart_dataset.data.length);
      // const chartData = {
      //   datasets: [{
      //     data: data.active_chart_dataset.labels,
      //     backgroundColor: colors[0], 
      //     labels: data.active_chart_dataset.data,
      //   },{
      //     data: data.active_type_chart.data,
      //     backgroundColor: colors[1], 
      //     labels: data.active_type_chart.labels, 
      //   },]
      // };
      // this.setState({chartData});
    }
  );
};

const getCostChanges = (id) => {
  getData(
    `${routeMap.unit_change}?cost_manager_id=${id}`,
    (data) => {
      AppDispatcher.dispatch({
        action: ActionType.REGULARCOST.CHANGES,
        data: data,
        state: 'unit_change',
      });
    });
};

const getIncomeChanges = (id) => {
  getData(
    `${routeMap.unit_change}?incomes_id=${id}`,
    (data) => {
      AppDispatcher.dispatch({
        action: ActionType.PATRIMONY.CHANGES,
        data: data,
        state: 'unit_change',
      });
    });
};

const getProtection = (id) => {
  getData(
    `${routeMap.protection_manager}${id}/`,
    (data) => {
      AppDispatcher.dispatch({
        action: ActionType.PROTECTION.GETFORMSUCCESS,
        data: data,
        state: 'protection_manager',
      });
    });
};

const getEmergencyReserve = (patrimony_id, cost_manager_id) => {
  getData(
    `${routeMap.emergency_reserve}?patrimony_id=${patrimony_id}` +
    `&cost_manager_id=${cost_manager_id}`,
    (data) => {
      if (data.length) {
        data = data[0];
        AppDispatcher.dispatch({
          action: ActionType.PROTECTION.GETEMERGENCY,
          data: data,
          state: 'emergency_reserve',
        });
      }
    });

};

const getClient = (id) => {
  getData(
    `${routeMap.active_client}${id}/`,
    (data) => {
      AppDispatcher.dispatch({
        action: ActionType.CLIENT.GETFORMSUCCESS,
        data: data,
        state: 'active_client',
      });
    }
  );
};

const getFinancialIndependence = (id) => {
  getData(
    `${routeMap.financial_independence}${id}/`,
    (data) => {
      AppDispatcher.dispatch({
        action: ActionType.INDEPENDENCE.GETFORMSUCCESS,
        data: data,
        state: 'financial_independence',
      });
    }
  );
};

const getRegularCostManager = (id) => {
  getData(
    `${routeMap.cost_manager}${id}/`,
    (data) => {
      AppDispatcher.dispatch({
        action: ActionType.REGULARCOST.GETFORMSUCCESS,
        data: data,
        state: 'manager',
      });
    }
  );
};

const getGoalManager = (id) => {
  getData(
    `${routeMap.goal_manager}${id}/`,
    (data) => {
      AppDispatcher.dispatch({
        action: ActionType.GOAL.GETFORMSUCCESS,
        data: data,
        state: 'goalManager',
      });
    }
  );
};

const getPatrimony = (id) => {
  getData(`${routeMap.patrimony}${id}/`,
    (data) => {
      AppDispatcher.dispatch({
        action: ActionType.PATRIMONY.GETFORMSUCCESS,
        data: data,
        state: 'patrimony',
      });
    }
  );

};

const getFinancialPlanning = (id) => {
  getData(`${routeMap.financial_planning}${id}/`,
    (data) => {
      AppDispatcher.dispatch({
        action: ActionType.RESETFORMSTORES,
      });
      AppDispatcher.dispatch({
        action: ActionType.REGISTER.STORE,
        data: data,
      });
      getClient(data.active_client_id);
      if (data.cost_manager_id) {
        getRegularCostManager(data.cost_manager_id);
      }
      if (data.goal_manager_id) {
        getGoalManager(data.goal_manager_id);
      }
      if (data.patrimony_id) {
        getPatrimony(data.patrimony_id);
      }
      if (data.financial_independence_id) {
        getFinancialIndependence(data.financial_independence_id);
      }
      if (data.protection_manager) {
        getProtection(data.protection_manager);
      }
      if (data.patrimony_id && data.cost_manager_id) {
        getEmergencyReserve(data.patrimony_id, data.cost_manager_id);
      }
      // others gets
    });
};

const getPatrimonyFlow = (id) => {
  getData(`${routeMap.financial_planning}${id}/patrimony_flow/`,
    (data) => {
      AppDispatcher.dispatch({
        action: ActionType.PATRIMONY.FLOW,
        data: data
      });
    });
};

export {getClient,
  getFinancialPlanning,
  getGoalManager,
  getIncomeChanges,
  getCostChanges,
  getPatrimonyFlow,
  getProtection,
  getActiveChartData,};
