export const setSelectedSlid=(slid_obj)=>{ 
	return {
		type: 'UPDATE_SELECTED_SLID',
		obj:slid_obj 
	};
}

export const updateContentMap=(map_obj)=>{ 
	return {
		type: 'UPDATE_CONTENT_MAP',
		obj:map_obj 
	};
}

export const updatePresentation=(presentation_obj)=>{ 
	return {
		type: 'UPDATE_PRESENTATION',
		obj:presentation_obj 
	};
}

export const updateSlid=(presentation_obj)=>{ 
	return {
		type: 'UPDATE_PRESENTATION_SLIDS',
		obj:presentation_obj 
	};
}

