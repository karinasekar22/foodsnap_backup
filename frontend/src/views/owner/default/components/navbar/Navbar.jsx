import { Box, Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Link, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import NavbarLinkOwner from './NavbarLinkOwner';

const Navbar = ({ brandText, message, onOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 1);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainText = useColorModeValue('green.300', 'white');
  const secondaryText = useColorModeValue('green.500', 'white');
  const navbarBg = useColorModeValue('rgba(244, 247, 254, 0.2)', 'rgba(11,20,55,0.5)');
  const navbarStyles = {
    zIndex: 1000,
    position: 'fixed',
    boxShadow: 'none',
    bg: navbarBg,
    borderColor: 'transparent',
    filter: 'none',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    transition: 'all 0.25s linear',
    alignItems: { xl: 'center' },
    display: 'flex',
    minH: '75px',
    justifyContent: { xl: 'center' },
    w: { base: 'calc(100vw - 6%)', md: 'calc(100vw - 8%)', xl: 'calc(100vw - 350px)', '2xl': 'calc(100vw - 365px)' },
    mx: 'auto',
    mt: '0px',
    top: { base: '12px', md: '16px', xl: '20px' },
    right: { base: '12px', md: '30px', xl: '30px' },
    px: { sm: '15px', md: '10px' },
    pt: '8px',
    pb: '8px',
  };

  return (
    <Box {...navbarStyles}>
      <Flex w="100%" flexDirection={{ sm: 'column', md: 'row' }} alignItems={{ xl: 'center' }}>
        <Box mb={{ sm: '8px', md: '0px' }}>
          <Breadcrumb>
            <BreadcrumbItem color={secondaryText} fontSize="sm">
              <BreadcrumbLink href="#">Pages</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem color={secondaryText} fontSize="sm">
              <BreadcrumbLink href="#">{brandText}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Link
            color={mainText}
            href="#"
            fontWeight="bold"
            fontSize="34px"
            _hover={{ color: mainText }}
            _active={{ bg: 'inherit', transform: 'none' }}
            _focus={{ boxShadow: 'none' }}
          >
            {brandText}
          </Link>
        </Box>
        <Box ms="auto" w={{ sm: '100%', md: 'unset' }}>
          <NavbarLinkOwner onOpen={onOpen} brandText={brandText} message={message} scrolled={scrolled} />
        </Box>
      </Flex>
    </Box>
  );
}

Navbar.propTypes = {
  onOpen: PropTypes.func,
  brandText: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Navbar;
