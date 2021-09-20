import { FC, useEffect, useState } from 'react';
import { createBrowserHistory } from 'history'


export const history = createBrowserHistory()
export const adminHistory = createBrowserHistory({ basename: '/admins' })
