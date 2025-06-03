export type TautulliAuthProps = {
	baseUrl: string;
	apiKey: string;
  };
  
  export type TautulliAuthValue = {
	baseUrl: string;
	apiKey: string;
  };
  
  export type ServerInfoResponse = {
	response: {
	  result: string;
	  message: string;
	  data: {
		friendly_name: string;
		version: string;
		platform: string;
		branch: string;
		commit: string;
	  };
	};
  };
  
  export type RecentlyAddedResponse = {
	response: {
	  result: string;
	  data: {
		recordsFiltered: number;
		data: Array<{
		  rating_key: string;
		  title: string;
		  added_at: string;
		  section_name: string;
		  media_type: string;
		}>;
	  };
	};
  };
  
  // Add more endpoint-specific types below as you expand...
  