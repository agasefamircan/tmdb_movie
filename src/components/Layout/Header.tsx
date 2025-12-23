import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Drawer,
  ListItem,
  useMediaQuery,
  Slide,
  InputBase,
  Divider,
  Avatar,
  Button,
  Container,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FiMenu, FiSearch } from 'react-icons/fi';
import { useState, type FormEvent } from 'react';
import { useI18n } from '../../app/providers/I18nProvider';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { logout } from '../../app/authSlice';
import { useGetAccountQuery } from '../../api/tmdb/accountApi';

const Header = () => {
  const { t, language, changeLanguage } = useI18n()!;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const sessionId = localStorage.getItem('session_id');

  const { data: account } = useGetAccountQuery(sessionId!, {
    skip: !sessionId,
  });
  const username = account?.username;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [avatarAnchor, setAvatarAnchor] = useState<null | HTMLElement>(null);
  const [langMenuAnchor, setLangMenuAnchor] = useState<null | HTMLElement>(null);

  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchValue)}`);
    setSearchActive(false);
  };

  const menu = [
    {
      label: t('nav.movies'),
      links: [
        { label: t('nav.popular'), path: '/movies/popular' },
        { label: t('nav.nowplaying'), path: '/movies/now-playing' },
        { label: t('nav.upcoming'), path: '/movies/upcoming' },
        { label: t('nav.toprated'), path: '/movies/top-rated' },
      ],
    },
    {
      label: t('nav.tvshows'),
      links: [
        { label: t('nav.popular'), path: '/tvs/popular' },
        { label: t('nav.airingtoday'), path: '/tvs/airing-today' },
        { label: t('nav.ontheair'), path: '/tvs/on-the-air' },
        { label: t('nav.toprated'), path: '/tvs/top-rated' },
      ],
    },
  ];

  return (
    <AppBar position="sticky" sx={{ background: '#032541' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Container
          maxWidth="lg"
          sx={{
            maxWidth: '1240px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <FiMenu size={22} />
              </IconButton>
            )}

            <Typography
              variant="h5"
              sx={{ fontWeight: 800, color: '#0dd9ff', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              TMDB
            </Typography>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 2, ml: 3 }}>
                {menu.map((menus) => (
                  <Box
                    key={menus.label}
                    sx={{
                      position: 'relative',
                      color: '#fff',
                      cursor: 'pointer',
                      '&:hover .dropdown': { display: 'block' },
                    }}
                  >
                    {menus.label}
                    <Box
                      className="dropdown"
                      sx={{
                        display: 'none',
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        background: '#032541',
                        borderRadius: 1,
                        minWidth: 180,
                        boxShadow: '0 8px 24px rgba(0,0,0,.4)',
                        zIndex: 10,
                      }}
                    >
                      {menus.links.map((l) => (
                        <MenuItem
                          key={l.path}
                          component={Link}
                          to={l.path}
                          sx={{
                            color: '#fff',
                            '&:hover': { background: alpha('#0dd9ff', 0.2) },
                          }}
                        >
                          {l.label}
                        </MenuItem>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton sx={{ color: '#fff' }} onClick={() => setSearchActive((v) => !v)}>
              <FiSearch size={20} />
            </IconButton>

            {sessionId ? (
              <>
                <IconButton onClick={(e) => setAvatarAnchor(e.currentTarget)}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: '#01b4e4',
                      fontWeight: 600,
                    }}
                  >
                    {username ? username.charAt(0).toUpperCase() : 'U'}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={avatarAnchor}
                  open={Boolean(avatarAnchor)}
                  onClose={() => setAvatarAnchor(null)}
                >
                  <MenuItem onClick={() => navigate('/profile')}>{t('nav.profile')}</MenuItem>
                  <MenuItem onClick={() => navigate('/profile/favorites')}>
                    {t('nav.favorites')}
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/profile/watchlist')}>
                    {t('nav.watchlist')}
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    sx={{ color: 'error.main' }}
                    onClick={() => {
                      dispatch(logout());
                      setAvatarAnchor(null);
                      navigate('/');
                    }}
                  >
                    {t('nav.logout')}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button color="inherit" onClick={() => navigate('/login')}>
                {t('nav.login')}
              </Button>
            )}

            <Box
              onClick={(e) => setLangMenuAnchor(e.currentTarget)}
              sx={{
                px: 1,
                fontWeight: 600,
                color: '#0dd9ff',
                border: '1px solid #0dd9ff',
                borderRadius: 1,
                cursor: 'pointer',
              }}
            >
              {language.toUpperCase()}
            </Box>

            <Menu
              anchorEl={langMenuAnchor}
              open={Boolean(langMenuAnchor)}
              onClose={() => setLangMenuAnchor(null)}
            >
              {/* <MenuItem onClick={() => changeLanguage("az")}>
                Azerbaijani
              </MenuItem> */}
              <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
              <MenuItem onClick={() => changeLanguage('tr')}>Turkish</MenuItem>
              <MenuItem onClick={() => changeLanguage('ru')}>Russian</MenuItem>
            </Menu>
          </Box>
        </Container>
      </Toolbar>

      <Slide direction="down" in={searchActive} mountOnEnter unmountOnExit>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            background: '#fff',
            px: 3,
            py: 1.2,
            borderTop: '1px solid #ddd',
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              py: 1.2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FiSearch size={20} color="#666" />

              <InputBase
                autoFocus
                placeholder={t('search')}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                sx={{
                  width: '100%',
                  fontSize: 16,
                }}
              />
            </Box>
          </Container>
        </Box>
      </Slide>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ p: 2 }}>
          {menu.map((menus) => (
            <Box key={menus.label}>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>{menus.label}</Typography>
              {menus.links.map((l) => (
                <ListItem
                  key={l.path}
                  component={Link}
                  to={l.path}
                  onClick={() => setDrawerOpen(false)}
                >
                  {l.label}
                </ListItem>
              ))}
            </Box>
          ))}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
