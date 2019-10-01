export const updateObjects = (oldObjec, updatedProperties) => {
	return {
		...oldObjec,
		...updatedProperties
	}
};