export default {
    setTransactions(state,data) {
         state.transactions = data;
    },
    setTransactionGroup(state,data) {
         state.transactionGroups = data;
    },
    newTransaction(state, data) {
        state.transactions.transactions.push(data);
    },
        newTransactionGroup(state, data) {
        state.transactionGroups.push(data);
    }
}