'use client';
import React from 'react';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  return (
    <div className="flex items-center w-full h-16 min-h-10 bg-white border-grey-400 border-b-2">
      <div className="flex items-center px-4 text-2xl font-bold font-fugaz">
        <Link href="/" className="">
          TheNote
        </Link>
      </div>
      <div className="flex h-full w-full justify-end items-center">
        <AccountCircleIcon className="flex h-16 w-16 px-4"></AccountCircleIcon>
      </div>
    </div>
  );
};

export default Header;
