export const updateObject = (oldObjec, updatedProperties) => {
	return {
		...oldObjec,
		...updatedProperties
	}
};