export default {
    addTargetCategory(state, payload){
        state.targets.push(payload);
    },
    updateTarget(state, payload){
        const targetIndex = state.targets.findIndex(target => target.category === payload.category);
        state.targets[targetIndex] = payload;
    },
    deleteTarget(state, payload){
        const targetIndex = state.targets.findIndex(target => target.category === payload.category);
        state.targets.splice(targetIndex, 1);
        console.log(targetIndex);
        console.log(state.targets[targetIndex]);
    },
    setTargets(state, payload){
        state.targets = payload;
    }
}