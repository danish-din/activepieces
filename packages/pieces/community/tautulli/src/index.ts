import {
  createPiece,
  PieceAuth,
  Property,
} from '@activepieces/pieces-framework';
import { PieceCategory } from '@activepieces/shared';

import { makeClient } from './lib/common';
import { TautulliAuthValue } from './lib/common/types';

import { arnold } from './lib/actions/arnold';
import { backupConfig } from './lib/actions/backup-config';
import { backupDatabase } from './lib/actions/backup-database';
import { getActivity } from './lib/actions/get-activity';
import { getHomeStats } from './lib/actions/get-home-stats';
import { getLibraries } from './lib/actions/get-libraries';
import { getLibraryMediaInfo } from './lib/actions/get-library-media-info';
import { getHistory } from './lib/actions/get-watch-history';
import { getMetadata } from './lib/actions/get-metadata';
import { getNotificationLog } from './lib/actions/get-notification-log';
import { getServerIdentity } from './lib/actions/get-server-identity';
import { getServerInfo } from './lib/actions/get-server-info';
import { getStreamData } from './lib/actions/get-stream-data';
import { getUser } from './lib/actions/get-user-info';
import { getUsers } from './lib/actions/get-users';
import { getWhoisLookup } from './lib/actions/get-whois-lookup';
import { notifyRecentlyAdded } from './lib/actions/notify-recently-added';
import { notify } from './lib/actions/send-notification';
import { logoutUserSession } from './lib/actions/logout-user-session';
import { getGeoipLookup } from './lib/actions/get-geoip-lookup';
import { getUserIps } from './lib/actions/get-user-ips';
import { getUserLogins } from './lib/actions/get-user-logins';
import { getUserNames } from './lib/actions/get-user-names';
import { getUserPlayerStats } from './lib/actions/get-user-player-stats';
import { getUserWatchTimeStats } from './lib/actions/get-user-watch-time-stats';
import { getUsersTable } from './lib/actions/get-users-table';
import { refreshLibrariesList } from './lib/actions/refresh-libraries-list';
import { refreshUsersList } from './lib/actions/refresh-users-list';
import { registerDevice } from './lib/actions/register-device';
import { regroupHistory } from './lib/actions/regroup-history';
import { restart } from './lib/actions/restart';
import { search } from './lib/actions/search';
import { serverStatus } from './lib/actions/server-status';
import { setMobileDeviceConfig } from './lib/actions/set-mobile-device-config';
import { setNewsletterConfig } from './lib/actions/set-newsletter-config';
import { setNotifierConfig } from './lib/actions/set-notifier-config';
import { sqlQuery } from './lib/actions/sql-query';
import { status } from './lib/actions/status';
import { terminateSession } from './lib/actions/terminate-session';
import { undeleteLibrary } from './lib/actions/undelete-library';
import { undeleteUser } from './lib/actions/undelete-user';
import { update } from './lib/actions/update';
import { updateCheck } from './lib/actions/update-check';
import { updateMetadataDetails } from './lib/actions/update-metadata-details';

import { newStreamStarted } from './lib/triggers/new-stream-started';
import { newPlaybackInHistory } from './lib/triggers/new-playback-in-history';
import { userLoginDetected } from './lib/triggers/user-login-detected';
import { bandwidthSpikeDetected } from './lib/triggers/bandwidth-spike-detected';
import { ipChangeDetected } from './lib/triggers/ip-change-detected';
import { watchTimeSpikeDetected } from './lib/triggers/watch-time-spike-detected';
import { playerUsageDetected } from './lib/triggers/player-usage-detected';
import { notificationSent } from './lib/triggers/notification-sent';
// import { newUserAdded } from './lib/triggers/new-user-added';
// import { newUsernameDiscovered } from './lib/triggers/new-username-discovered';
// import { mediaAddedToLibrary } from './lib/triggers/media-added-to-library';
// import { libraryChangeDetected } from './lib/triggers/library-change-detected';
// import { serverInfoChanged } from './lib/triggers/server-info-changed';

const authGuide = `
To connect Tautulli:

1. Open Tautulli.
2. Go to **Settings > Web Interface**.
3. Copy your **API Key** and base URL.
Example: http://192.168.1.207:8181
`;

export const tautulliAuth = PieceAuth.CustomAuth({
  required: true,
  description: authGuide,
  props: {
    baseUrl: Property.ShortText({
      displayName: 'Tautulli Base URL',
      required: true,
      description: 'e.g. http://192.168.1.207:8181',
    }),
    apiKey: Property.ShortText({
      displayName: 'API Key',
      required: true,
      description: 'Get this from Tautulli > Settings > Web Interface',
    }),
  },
  validate: async ({ auth }) => {
    try {
      const client = makeClient(auth as TautulliAuthValue);
      const res = await client.getServerFriendlyName(); // returns a string
  
      console.log('[Tautulli Validate] Auth:', JSON.stringify(auth, null, 2));
      console.log('[Tautulli Validate] Response:', res);
  
      if (!res || typeof res !== 'string' || res.length === 0) {
        return { valid: false, error: 'Could not verify server name — check credentials.' };
      }
  
      return { valid: true };
    } catch (error) {
      console.error('[Tautulli Validate] Error:', error);
      return {
        valid: false,
        error: 'Invalid Base URL or API Key',
      };
    }
  }
  ,
  
});

export const tautulli = createPiece({
  displayName: 'Tautulli',
  description:
    'Monitor, analyze, and get insights into your Plex Media Server activity with Tautulli’s powerful tracking and notification tools.',
  auth: tautulliAuth,
  minimumSupportedRelease: '0.36.1',
  logoUrl: 'https://tautulli.com/images/logo-circle.png',
  categories: [PieceCategory.PRODUCTIVITY],
  authors: ['DanishDin'],
  actions: [
    arnold,
    backupConfig,
    backupDatabase,
    getServerIdentity,
    getServerInfo,
    getActivity,
    getUser,
    getUsers,
    getHomeStats,
    getStreamData,
    getMetadata,
    getLibraries,
    getNotificationLog,
    getWhoisLookup,
    notify,
    notifyRecentlyAdded,
    getLibraryMediaInfo,
    getHistory,
    logoutUserSession,
    getGeoipLookup,
    getUserIps,
    getUserLogins,
    getUserNames,
    getUserPlayerStats,
    getUserWatchTimeStats,
    getUsersTable,
    refreshLibrariesList,
    refreshUsersList,
    registerDevice,
    regroupHistory,
    restart,
    search,
    serverStatus,
    setMobileDeviceConfig,
    setNewsletterConfig,
    setNotifierConfig,
    sqlQuery,
    status,
    terminateSession,
    undeleteLibrary,
    undeleteUser,
    update,
    updateCheck,
    updateMetadataDetails,
  ],
  triggers: [
    newStreamStarted,
    newPlaybackInHistory,
    userLoginDetected,
    bandwidthSpikeDetected,
    ipChangeDetected,
    watchTimeSpikeDetected,
    playerUsageDetected,
    notificationSent,
    // newUserAdded,
    // newUsernameDiscovered,
    // mediaAddedToLibrary,
    // libraryChangeDetected,
    // serverInfoChanged,
  ],
});
